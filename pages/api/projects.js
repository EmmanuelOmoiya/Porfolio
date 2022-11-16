// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import projects from '../data/projects.json';
export default function handler(req, res) {
  res.status(200).json(projects)
}
