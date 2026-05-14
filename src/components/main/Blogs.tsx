'use client'

import { BlogTile } from '@/components/sub/BlogTile'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useState } from 'react'

const blogs = [
  {
    id: 1,
    title: '🎬 CiniRev: A Full-Stack Movie Review & Recommendation App',
    excerpt:
      'How I built a movie review app with Flutter, FastAPI, and PostgreSQL — featuring a recommendation system powered by the Apriori algorithm.',
    content: `CiniRev is my final year BCA project — a full-stack movie review and recommendation app built using Flutter for the frontend, Python FastAPI for the backend, and PostgreSQL as the database.

Users can browse and filter movies, write reviews and ratings, manage their watchlist, and receive personalized movie recommendations.

The highlight of the project is the recommendation system built using the Apriori algorithm — an association rule mining technique that finds patterns like "users who liked Movie A also liked Movie B" to suggest relevant movies.

Building CiniRev taught me how to design REST APIs with FastAPI, manage relational data in PostgreSQL, and deliver a smooth cross-platform UI with Flutter. It was a complete end-to-end experience from database design to deployment.`,
  },
  {
    id: 2,
    title: '🚀 Deploying My First CI/CD Static Website on GitHub Pages',
    excerpt:
      'How I set up a fully automated CI/CD pipeline using GitHub Actions to deploy a static website on GitHub Pages with every push.',
    content: `This project was my first hands-on experience with the full code-to-live pipeline using DevOps practices.

I deployed a static website built with HTML, CSS, and JavaScript on GitHub Pages, and automated the entire deployment process using GitHub Actions. Every push to the main branch triggers a workflow that builds and deploys the site automatically — no manual steps needed.

The GitHub Actions workflow file (.github/workflows/pages.yml) handles the build and deploy steps, making the process fast, reliable, and repeatable.

This project gave me practical experience with version control, CI/CD pipelines, build automation, and real-time hosting — core skills for any DevOps role.

The site is live and the source code is open on GitHub.`,
  },
  {
    id: 3,
    title: '🛠️ Automated Linux Server Setup with Ansible',
    excerpt:
      'How I automated a complete Linux server setup using Ansible — installing tools, hardening SSH, and configuring firewalls with a single command.',
    content: `As part of my hands-on learning in Linux System Administration and DevOps, I built an Ansible playbook that fully automates the setup of a Linux server from scratch.

With a single command, the playbook:
- Installs NGINX, Docker, Git, and UFW
- Creates a secure admin user with proper permissions
- Configures firewall rules using UFW
- Hardens SSH security by disabling root login

This project helped me understand real-world server provisioning, infrastructure automation, and security hardening practices that are essential in DevOps and cloud roles.

Writing Ansible playbooks also gave me a solid understanding of idempotency — the ability to run the same playbook multiple times safely without breaking anything.

The full playbook is available on GitHub.`,
  },
]

export function BlogsSection() {
  const [selectedBlog, setSelectedBlog] = useState<null | (typeof blogs)[0]>(null)

  return (
    <section id="blogs" className="w-full py-12 dark:bg-neutral-950">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="mb-8 text-3xl font-bold text-center text-zinc-800 dark:text-zinc-100">
          Blogs
        </h2>

        <div className="grid gap-4">
          {blogs.map((blog) => (
            <BlogTile
              key={blog.id}
              title={blog.title}
              excerpt={blog.excerpt}
              onRead={() => setSelectedBlog(blog)}
            />
          ))}
        </div>
      </div>

      <Dialog open={!!selectedBlog} onOpenChange={() => setSelectedBlog(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] max-h-[90vh] overflow-y-auto p-6 rounded-lg bg-white dark:bg-neutral-900">
          {selectedBlog && (
            <>
              <DialogHeader className="sticky top-0 bg-white dark:bg-neutral-900 z-10 pb-4 border-b border-zinc-200 dark:border-zinc-700">
                <DialogTitle className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
                  {selectedBlog.title}
                </DialogTitle>
              </DialogHeader>
              <div className="mt-6 prose prose-zinc dark:prose-invert max-w-none">
                <p className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {selectedBlog.content}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
