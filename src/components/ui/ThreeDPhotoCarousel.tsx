"use client"

import { memo, useEffect, useLayoutEffect, useState } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"
import { Project } from "@/lib/github"
import { ArrowRight, Github, X } from "lucide-react"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  const handleChange = () => {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()

    matchMedia.addEventListener("change", handleChange)

    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}

const duration = 0.15
const transition = {
  duration,
  ease: [0.32, 0.72, 0, 1] as const,
  filter: "blur(4px)",
}
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const }

const Carousel = memo(
  ({
    handleClick,
    controls,
    projects,
    isCarouselActive,
  }: {
    handleClick: (project: Project, index: number) => void
    controls: any
    projects: Project[]
    isCarouselActive: boolean
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = isScreenSizeSm ? 1100 : 2000
    const faceCount = projects.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )

    return (
      <div
        className="flex h-full items-center justify-center bg-transparent"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) =>
            isCarouselActive &&
            rotation.set(rotation.get() + info.offset.x * 0.05)
          }
          onDragEnd={(_, info) =>
            isCarouselActive &&
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }
          animate={controls}
        >
          {projects.map((project, i) => (
            <motion.div
              key={`key-${project.id}-${i}`}
              className="absolute flex h-[180px] md:h-[280px] origin-center items-center justify-center rounded-2xl bg-card border border-border/50 shadow-2xl shadow-black/20"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(project, i)}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden group">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  layoutId={`img-${project.id}`}
                  className="pointer-events-none w-full h-full object-cover"
                  initial={{ filter: "blur(4px)" }}
                  layout="position"
                  animate={{ filter: "blur(0px)" }}
                  transition={transition}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-6">
                  <h3 className="text-white font-bold text-xl">{project.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)

function ThreeDPhotoCarousel({ projects }: { projects: Project[] }) {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const controls = useAnimation()

  const handleClick = (project: Project) => {
    setActiveProject(project)
    setIsCarouselActive(false)
    controls.stop()
  }

  const handleClose = () => {
    setActiveProject(null)
    setIsCarouselActive(true)
  }

  if (!projects || projects.length === 0) return null

  return (
    <motion.div layout className="relative w-full">
      <AnimatePresence mode="sync">
        {activeProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            layoutId={`img-container-${activeProject.id}`}
            layout="position"
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 md:p-12 lg:p-24"
            style={{ willChange: "opacity" }}
            transition={transitionOverlay}
          >
            <div 
              className="relative w-full max-w-5xl bg-card rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[500px]"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors shadow-xl border border-border/50"
              >
                <X size={20} />
              </button>

              <motion.img
                layoutId={`img-${activeProject.id}`}
                src={activeProject.image}
                className="w-full md:w-3/5 h-64 md:h-auto object-cover"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.2,
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1] as const,
                }}
                style={{
                  willChange: "transform",
                }}
              />
              <div className="w-full md:w-2/5 p-6 md:p-10 flex flex-col justify-between">
                <div>
                  <span className="text-primary font-bold text-xs tracking-widest uppercase mb-4 block">
                    {activeProject.category}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black mb-4 text-foreground">
                    {activeProject.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 text-sm md:text-base leading-relaxed">
                    {activeProject.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {activeProject.tech?.map(tech => (
                      <span key={tech} className="text-[10px] font-bold uppercase tracking-wider bg-secondary/50 text-secondary-foreground px-3 py-1 rounded-full border border-border/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col xl:flex-row gap-3 mt-auto">
                  <a 
                    href={activeProject.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 group/btn relative flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-xl font-bold whitespace-nowrap overflow-hidden transition-all hover:opacity-90 shadow-lg shadow-primary/20 text-sm"
                  >
                    <span>View Project</span>
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                  {activeProject.github && (
                    <a 
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-4 py-3 rounded-xl font-bold whitespace-nowrap transition-all hover:bg-secondary/80 border border-border/50 text-sm"
                    >
                      <Github size={16} />
                      <span>Repository</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative w-full overflow-hidden flex flex-col items-center pt-20 pb-32">
        <div className="text-center z-10 mb-24">
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-foreground">Featured Work</h2>
          <p className="text-muted-foreground uppercase tracking-widest text-sm font-bold">Drag to spin carousel</p>
        </div>
        <div className="relative h-[450px] w-full flex flex-col justify-center mt-12">
          <Carousel
            handleClick={handleClick}
            controls={controls}
            projects={projects}
            isCarouselActive={isCarouselActive}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default ThreeDPhotoCarousel
