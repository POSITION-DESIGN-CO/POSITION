"use client"

import Image from "next/image"
import Link from "next/link"

type Project = {
  sys: { id: string }
  title: string
  category: string
  year: string
  thumbnail: {
    url: string
    width: number
    height: number
  }
  location: string
}

interface ProjectGridProps {
  projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Link key={project.sys.id} href={`/projects/${project.sys.id}`} className="group block">
          <div className="overflow-hidden">
            <Image
              src={project.thumbnail.url || "/placeholder.svg"}
              alt={project.title}
              width={project.thumbnail.width}
              height={project.thumbnail.height}
              className="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="mt-2">
            <h3 className="text-lg font-medium">{project.title}</h3>
            <p className="text-sm text-gray-600">
              {project.category}, {project.year}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}

