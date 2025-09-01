// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'NGX IBAN Validator',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/SKaDiZZ/ngx-iban-validator',
        },
        {
          icon: 'npm',
          label: 'NPM',
          href: 'https://www.npmjs.com/package/ngx-iban-validator',
        },
      ],
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Getting Started', slug: 'guides/getting-started' },
            {
              label: 'Form Validation',
              items: [
                {
                  label: 'Angular',
                  slug: 'guides/form-validation/angular',
                },
                {
                  label: 'React',
                  slug: 'guides/form-validation/react',
                },
                {
                  label: 'Vue',
                  slug: 'guides/form-validation/vue',
                },
              ],
            },
          ],
        },
        {
          label: 'Reference',
          // autogenerate: { directory: 'reference' },
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Validation Result', slug: 'reference/validation-result' },
            { label: 'Error Response', slug: 'reference/error-response' },
            {
              label: 'Supported countries',
              slug: 'reference/supported-countries',
            },
          ],
        },
      ],
    }),
  ],
});
