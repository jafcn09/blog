import { useEffect } from 'react'

export const useScrollReveal = (active) => {
  useEffect(() => {
    if (!active) return

    const targets = Array.from(document.querySelectorAll('section:not(#header)'))
    targets.forEach((el) => el.classList.add('reveal'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [active])
}
