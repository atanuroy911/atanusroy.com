'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { BookOpen, GraduationCap, Mail, X } from 'lucide-react'
import { LinkedInLogoIcon } from '@radix-ui/react-icons'

type Student = {
  name: string
  photo?: string
  designation?: string
  linkedin?: string
  email?: string
  project?: string
  bio?: string
}

type StudentYearGroup = {
  year: string | number
  students: Student[]
}

type StudentYearGroupInput = {
  year?: string | number
  students: Student[]
}

type StudentFlatInput = Student & {
  year?: string | number
}

type StudentInput = StudentFlatInput | StudentYearGroupInput

function isStudentYearGroup(entry: StudentInput): entry is StudentYearGroupInput {
  return 'students' in entry
}

function StudentDetailModal({
  student,
  year,
  onClose,
}: {
  student: Student
  year: string | number
  onClose: () => void
}) {
  if (!student) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-3 md:p-4">
      <button
        aria-label="Close student details"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl dark:bg-slate-950 dark:border-white/10 flex flex-col md:flex-row">
        <div className="w-full md:w-[42%] min-h-55 md:min-h-full bg-slate-100 dark:bg-slate-900 border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10">
          {student.photo ? (
            <Image src={student.photo} alt={student.name} width={700} height={700} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center p-8 text-center text-slate-500">
              <div>
                <BookOpen size={44} className="mx-auto mb-3 text-slate-400" />
                <p className="text-sm uppercase tracking-widest font-semibold">Student Profile</p>
              </div>
            </div>
          )}
        </div>

        <div className="w-full md:w-[58%] p-5 md:p-7 overflow-y-auto">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Student Profile</p>
              <h3 className="text-2xl md:text-3xl font-bold leading-tight" style={{ color: 'var(--ac-navy)' }}>
                {student.name}
              </h3>
              <p className="mt-2 text-sm md:text-base text-slate-600">
                {student.designation} · {year}
              </p>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 rounded-full border border-slate-200 bg-white p-2 text-slate-600 hover:text-black hover:border-slate-300 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <p className="text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300 mb-4">
            {student.bio || student.project || 'No bio available.'}
          </p>

          <div className="flex flex-wrap gap-3">
            {student.linkedin && (
              <a
                href={student.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-(--ac-navy) hover:text-(--ac-navy) dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              >
                <LinkedInLogoIcon />
                LinkedIn
              </a>
            )}
            {student.email && (
              <a
                href={`mailto:${student.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-(--ac-navy) hover:text-(--ac-navy) dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              >
                <Mail size={16} />
                Email
              </a>
            )}
          </div>

          {student.project && (
            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Project</p>
              <p className="leading-relaxed">{student.project}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function groupStudentsByYear(rawStudents: StudentInput[]): StudentYearGroup[] {
  if (!Array.isArray(rawStudents) || rawStudents.length === 0) return []

  const firstEntry = rawStudents[0]

  if (isStudentYearGroup(firstEntry)) {
    return (rawStudents as StudentYearGroupInput[])
      .map((group) => {
        return {
          year: group.year ?? 'Students',
          students: group.students || [],
        }
      })
      .sort((a, b) => Number(b.year) - Number(a.year))
  }

  const groups = new Map<string, Student[]>()

  rawStudents.forEach((student) => {
    if (isStudentYearGroup(student)) return

    const year = String(student.year ?? 'Students')
    const list = groups.get(year) || []
    list.push({
      name: student.name,
      photo: student.photo,
      designation: student.designation,
      linkedin: student.linkedin,
      email: student.email,
      project: student.project,
      bio: student.bio,
    })
    groups.set(year, list)
  })

  return [...groups.entries()]
    .map(([year, students]) => ({ year, students }))
    .sort((a, b) => Number(b.year) - Number(a.year))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function StudentsClient({ content }: { content: any }) {
  const rawStudents = content?.academic?.students || []
  const sortedGroups = groupStudentsByYear(rawStudents)
  const [selectedStudent, setSelectedStudent] = useState<{ student: Student; year: string | number } | null>(null)

  return (
    <div className="py-8" style={{ minHeight: '100vh' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-14 text-left">
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--ac-navy)' }}>
            Students
          </h1>
          <div className="h-1 w-20 mt-4" style={{ background: 'var(--ac-gold)' }} />
          <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
            I actively guide undergraduate students in their final year capstone projects. My supervision focuses on solving complex engineering problems within the domains of computer vision, IoT systems, and robotics.
          </p>
        </motion.div>

        <div className="space-y-12">
          {sortedGroups.map((group, groupIndex) => (
            <section key={String(group.year)} id={`year-${group.year}`} className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: groupIndex * 0.08 }}
                className="flex flex-col items-start gap-2 text-left"
              >
                <div className="flex items-center gap-3 justify-start">
                  <GraduationCap className="text-(--ac-navy)" size={18} />
                  <h2 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--ac-navy)' }}>
                    {group.year}
                  </h2>
                </div>
                <div className="h-1 w-20 bg-(--ac-gold)" />
                <p className="text-sm text-slate-500">
                  {group.students.length} student{group.students.length > 1 ? 's' : ''}
                </p>
              </motion.div>

              <div className="flex flex-wrap justify-center gap-10 md:gap-12">
                {group.students.map((student: Student, studentIndex: number) => (
                  <motion.div
                    key={`${group.year}-${student.name}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: studentIndex * 0.08 }}
                    className="w-full max-w-56"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="h-36 w-36 overflow-hidden rounded-full border-4 border-white shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
                        <Image
                          src={student.photo || `/images/profile.jpg`}
                          alt={student.name}
                          width={144}
                          height={144}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <h3 className="mt-5 text-lg md:text-xl font-bold leading-tight text-slate-900">
                        {student.name}
                      </h3>
                      <p className="mt-2 text-sm md:text-base text-slate-600">
                        {student.designation}
                      </p>

                      <div className="mt-4 flex items-center justify-center gap-3">
                        {student.linkedin && (
                          <a
                            href={student.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${student.name} LinkedIn`}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-(--ac-navy) hover:text-(--ac-navy)"
                          >
                            <LinkedInLogoIcon />
                          </a>
                        )}
                        {student.email && (
                          <a
                            href={`mailto:${student.email}`}
                            aria-label={`${student.name} email`}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-(--ac-navy) hover:text-(--ac-navy)"
                          >
                            <Mail size={17} />
                          </a>
                        )}
                        <button
                          type="button"
                          aria-label={`${student.name} bio`}
                          onClick={() => setSelectedStudent({ student, year: group.year })}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-(--ac-navy) hover:text-(--ac-navy)"
                        >
                          <BookOpen size={17} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent.student}
          year={selectedStudent.year}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  )
}
