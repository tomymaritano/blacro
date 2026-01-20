import { MetadataRoute } from 'next';
import { categoryProjects } from '@/data/categories';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://blacro.com';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/experiencias`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/espacios`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/branding`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Dynamic project pages
  const experienciasPages: MetadataRoute.Sitemap = categoryProjects.experiencias.map((project) => ({
    url: `${baseUrl}/experiencias/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const espaciosPages: MetadataRoute.Sitemap = categoryProjects.espacios.map((project) => ({
    url: `${baseUrl}/espacios/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const brandingPages: MetadataRoute.Sitemap = categoryProjects.branding.map((project) => ({
    url: `${baseUrl}/branding/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...experienciasPages, ...espaciosPages, ...brandingPages];
}
