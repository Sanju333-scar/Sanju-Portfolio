export interface Skill {
  skill_name: string
  Image: string
  width: number
  height: number
}

export const skills: Skill[] = [
  { skill_name: 'HTML', Image: '/htmx.svg', width: 80, height: 80 },

  { skill_name: 'React', Image: '/react.png', width: 80, height: 80 },

  { skill_name: 'Node.js', Image: '/node-js.png', width: 80, height: 80 },

  { skill_name: 'Python', Image: '/python.png.svg', width: 75, height: 75 },

  { skill_name: 'C++', Image: '/cplusplus.svg', width: 75, height: 75 },

  { skill_name: 'FastAPI', Image: '/fastapi.svg', width: 75, height: 75 },

  { skill_name: 'PostgreSQL', Image: '/postger.png', width: 70, height: 70 },

  { skill_name: 'MySQL', Image: '/mysql.png', width: 70, height: 70 },

  { skill_name: 'Docker', Image: '/docker.webp', width: 70, height: 70 },

  { skill_name: 'Kubernetes', Image: '/kubernetes.png', width: 70, height: 70 },

  { skill_name: 'AWS', Image: '/aws.png', width: 70, height: 70 },

  { skill_name: 'Git', Image: '/git.svg', width: 70, height: 70 },

  { skill_name: 'GitHub Actions', Image: '/githubactions.svg', width: 75, height: 75 },

  { skill_name: 'Linux', Image: '/linux.svg', width: 75, height: 75 },

  { skill_name: 'Azure DevOps', Image: '/azure-devops.png', width: 75, height: 75 },

  { skill_name: 'Bash', Image: '/Bash.png', width: 75, height: 75 },
]

export const Socials = [
  {
    name: 'Discord',
    src: '/instagram.svg',
    link: '',
  },
  {
    name: 'Facebook',
    src: '/facebook.svg',
    link: '',
  },
  {
    name: 'Instagram',
    src: '/discord.svg',
    link: '',
  },
]
