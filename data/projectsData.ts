interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Teras Belajar Asik',
    description:
      'A FREE learning platform for college entrance exam preparation, offering various test modules and real-time assessments.',
    imgSrc: '/static/images/telisik.png',
    href: 'https://terasbelajarasik.web.id',
  },
  {
    title: 'Brain Bleeding Detector',
    description:
      'A machine learning model to detect brain bleeding in CT scans using Faster R-CNN, providing accurate predictions to assist doctors.',
    imgSrc: '/static/images/brain-bleeding-detector.png',
    href: 'https://github.com/artamananda/brain-bleeding-classification',
  },
]

export default projectsData
