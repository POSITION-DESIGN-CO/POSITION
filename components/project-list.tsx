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

interface ProjectListProps {
  projects: Project[]
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="w-full">
      <div className="mb-4 grid grid-cols-12 gap-4 border-b border-gray-300 pb-2 text-sm font-medium">
        <div className="col-span-4">Project</div>
        <div className="col-span-2">Year</div>
        <div className="col-span-3">Category</div>
        <div className="col-span-3">Location</div>
      </div>
      <div className="space-y-4">
        {projects.map((project) => (
          <Link
            key={project.sys.id}
            href={`/projects/${project.sys.id}`}
            className="group grid grid-cols-12 gap-4 border-b border-gray-200 pb-4"
          >
            <div className="col-span-4">
              <span className="hover:underline">{project.title}</span>
            </div>
            <div className="col-span-2">{project.year}</div>
            <div className="col-span-3">{project.category}</div>
            <div className="col-span-3 flex items-center">
              <span>{project.location}</span>
              {project.thumbnail && (
                <div className="ml-auto h-16 w-24 overflow-hidden">
                  <Image
                    src={project.thumbnail.url || "/placeholder.svg"}
                    alt={project.title}
                    width={project.thumbnail.width}
                    height={project.thumbnail.height}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

