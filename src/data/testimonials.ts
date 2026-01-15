export type Testimonial = {
  name: string
  role?: string
  company?: string
  message: string
  date?: string
  project?: string
}

// Only testimonials in this list are shown on the site.
// New submissions arrive via Netlify Forms and must be manually reviewed/added here.
export const approvedTestimonials: Testimonial[] = []
