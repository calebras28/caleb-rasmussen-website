import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

import { siteSettings } from "../src/lib/data/site";
import { projects } from "../src/lib/data/projects";
import { nowItems } from "../src/lib/data/now";
import { missionStories } from "../src/lib/data/mission";
import { experiences, education } from "../src/lib/data/resume";
import { skills } from "../src/lib/data/skills";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ---- Admin user -------------------------------------------------------
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "password123";
  const adminName = process.env.ADMIN_NAME ?? "Site Admin";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { name: adminName, passwordHash },
    create: { email: adminEmail, name: adminName, passwordHash, role: "ADMIN" },
  });
  console.log(`  ✓ Admin user: ${adminEmail}`);

  // ---- Site settings ----------------------------------------------------
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: { ...siteSettings },
    create: { id: "singleton", ...siteSettings },
  });
  console.log("  ✓ Site settings");

  // ---- Technologies -----------------------------------------------------
  const techNames = Array.from(
    new Set(projects.flatMap((p) => p.technologies)),
  );
  for (const name of techNames) {
    await prisma.technology.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log(`  ✓ ${techNames.length} technologies`);

  // ---- Projects (reset + recreate) --------------------------------------
  await prisma.projectTechnology.deleteMany();
  await prisma.projectImage.deleteMany();
  await prisma.project.deleteMany();

  for (const p of projects) {
    const created = await prisma.project.create({
      data: {
        slug: p.slug,
        title: p.title,
        summary: p.summary,
        description: p.description,
        problem: p.problem ?? null,
        solution: p.solution ?? null,
        features: p.features,
        architecture: p.architecture ?? null,
        whatILearned: p.whatILearned ?? null,
        challenges: p.challenges ?? null,
        futureImprovements: p.futureImprovements ?? null,
        category: p.category,
        status: p.status,
        githubUrl: p.githubUrl ?? null,
        liveUrl: p.liveUrl ?? null,
        coverImage: p.coverImage ?? null,
        featured: p.featured,
        order: p.order,
        date: new Date(p.date),
        images: {
          create: p.images.map((img, i) => ({
            url: img.url,
            alt: img.alt,
            order: i,
          })),
        },
      },
    });

    for (const techName of p.technologies) {
      const tech = await prisma.technology.findUnique({ where: { name: techName } });
      if (tech) {
        await prisma.projectTechnology.create({
          data: { projectId: created.id, technologyId: tech.id },
        });
      }
    }
  }
  console.log(`  ✓ ${projects.length} projects`);

  // ---- Now items --------------------------------------------------------
  await prisma.nowItem.deleteMany();
  await prisma.nowItem.createMany({
    data: nowItems.map((n, i) => ({
      title: n.title,
      description: n.description,
      status: n.status,
      progress: n.progress,
      technologies: n.technologies,
      goals: n.goals ?? null,
      order: i,
    })),
  });
  console.log(`  ✓ ${nowItems.length} now items`);

  // ---- Mission ----------------------------------------------------------
  await prisma.missionPhoto.deleteMany();
  await prisma.missionStory.deleteMany();
  for (let i = 0; i < missionStories.length; i++) {
    const s = missionStories[i];
    await prisma.missionStory.create({
      data: {
        title: s.title,
        location: s.location,
        date: new Date(s.date),
        body: s.body,
        order: i,
        photos: {
          create: s.photos.map((ph, j) => ({
            url: ph.url,
            caption: ph.caption ?? null,
            location: ph.location ?? null,
            date: ph.date ? new Date(ph.date) : null,
            width: ph.width ?? null,
            height: ph.height ?? null,
            order: j,
          })),
        },
      },
    });
  }
  console.log(`  ✓ ${missionStories.length} mission stories`);

  // ---- Resume: experience, education, skills ----------------------------
  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: experiences.map((e, i) => ({
      role: e.role,
      company: e.company,
      location: e.location ?? null,
      startDate: new Date(e.startDate),
      endDate: e.endDate ? new Date(e.endDate) : null,
      current: e.current,
      description: e.description,
      highlights: e.highlights,
      order: i,
    })),
  });

  await prisma.education.deleteMany();
  await prisma.education.createMany({
    data: education.map((e, i) => ({
      school: e.school,
      degree: e.degree,
      field: e.field ?? null,
      location: e.location ?? null,
      startDate: new Date(e.startDate),
      endDate: e.endDate ? new Date(e.endDate) : null,
      current: e.current,
      description: e.description ?? null,
      highlights: e.highlights,
      order: i,
    })),
  });

  await prisma.resumeSkill.deleteMany();
  await prisma.resumeSkill.createMany({
    data: skills.map((s, i) => ({
      category: s.category,
      name: s.name,
      level: s.level,
      order: i,
    })),
  });
  console.log(
    `  ✓ ${experiences.length} experiences, ${education.length} education, ${skills.length} skills`,
  );

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
