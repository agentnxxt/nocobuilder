export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://nocobuilder.cloud/#organization',
        name: 'Sim',
        alternateName: 'Sim',
        description:
          'Sim is the open-source platform to build AI agents and run your agentic workforce. Connect 1,000+ integrations and LLMs to deploy and orchestrate agentic workflows.',
        url: 'https://nocobuilder.cloud',
        logo: {
          '@type': 'ImageObject',
          '@id': 'https://nocobuilder.cloud/#logo',
          url: 'https://nocobuilder.cloud/logo/b&w/text/b&w.svg',
          contentUrl: 'https://nocobuilder.cloud/logo/b&w/text/b&w.svg',
          width: 49.78314,
          height: 24.276,
          caption: 'Sim Logo',
        },
        image: { '@id': 'https://nocobuilder.cloud/#logo' },
        sameAs: [
          'https://x.com/simdotai',
          'https://github.com/nocobuilder/sim',
          'https://www.linkedin.com/company/nocobuilder/',
          'https://discord.gg/Hr4UWYEcTT',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          availableLanguage: ['en'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://nocobuilder.cloud/#website',
        url: 'https://nocobuilder.cloud',
        name: 'Sim — Build AI Agents & Run Your Agentic Workforce',
        description:
          'Sim is the open-source platform to build AI agents and run your agentic workforce. Connect 1,000+ integrations and LLMs to deploy and orchestrate agentic workflows. Join 100,000+ builders.',
        publisher: {
          '@id': 'https://nocobuilder.cloud/#organization',
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'WebPage',
        '@id': 'https://nocobuilder.cloud/#webpage',
        url: 'https://nocobuilder.cloud',
        name: 'Sim — Build AI Agents & Run Your Agentic Workforce',
        isPartOf: {
          '@id': 'https://nocobuilder.cloud/#website',
        },
        about: {
          '@id': 'https://nocobuilder.cloud/#software',
        },
        datePublished: '2024-01-01T00:00:00+00:00',
        dateModified: new Date().toISOString(),
        description:
          'Sim is the open-source platform to build AI agents and run your agentic workforce. Connect 1,000+ integrations and LLMs to deploy and orchestrate agentic workflows. Create agents, workflows, knowledge bases, tables, and docs.',
        breadcrumb: {
          '@id': 'https://nocobuilder.cloud/#breadcrumb',
        },
        inLanguage: 'en-US',
        potentialAction: [
          {
            '@type': 'ReadAction',
            target: ['https://nocobuilder.cloud'],
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://nocobuilder.cloud/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://nocobuilder.cloud',
          },
        ],
      },
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://nocobuilder.cloud/#software',
        name: 'Sim — Build AI Agents & Run Your Agentic Workforce',
        description:
          'Sim is the open-source platform to build AI agents and run your agentic workforce. Connect 1,000+ integrations and LLMs to deploy and orchestrate agentic workflows. Create agents, workflows, knowledge bases, tables, and docs. Trusted by over 100,000 builders. SOC2 and HIPAA compliant.',
        applicationCategory: 'DeveloperApplication',
        applicationSubCategory: 'AI Development Tools',
        operatingSystem: 'Web, Windows, macOS, Linux',
        softwareVersion: '1.0',
        offers: [
          {
            '@type': 'Offer',
            '@id': 'https://nocobuilder.cloud/#offer-free',
            name: 'Community Plan',
            price: '0',
            priceCurrency: 'USD',
            priceValidUntil: '2026-12-31',
            itemCondition: 'https://schema.org/NewCondition',
            availability: 'https://schema.org/InStock',
            seller: {
              '@id': 'https://nocobuilder.cloud/#organization',
            },
            eligibleRegion: {
              '@type': 'Place',
              name: 'Worldwide',
            },
          },
          {
            '@type': 'Offer',
            '@id': 'https://nocobuilder.cloud/#offer-pro',
            name: 'Pro Plan',
            price: '20',
            priceCurrency: 'USD',
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: '20',
              priceCurrency: 'USD',
              unitText: 'MONTH',
              billingIncrement: 1,
            },
            priceValidUntil: '2026-12-31',
            itemCondition: 'https://schema.org/NewCondition',
            availability: 'https://schema.org/InStock',
            seller: {
              '@id': 'https://nocobuilder.cloud/#organization',
            },
          },
          {
            '@type': 'Offer',
            '@id': 'https://nocobuilder.cloud/#offer-team',
            name: 'Team Plan',
            price: '40',
            priceCurrency: 'USD',
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: '40',
              priceCurrency: 'USD',
              unitText: 'MONTH',
              billingIncrement: 1,
            },
            priceValidUntil: '2026-12-31',
            itemCondition: 'https://schema.org/NewCondition',
            availability: 'https://schema.org/InStock',
            seller: {
              '@id': 'https://nocobuilder.cloud/#organization',
            },
          },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '150',
          bestRating: '5',
          worstRating: '1',
        },
        featureList: [
          'AI agent creation',
          'Agentic workflow orchestration',
          '1,000+ integrations',
          'LLM orchestration (OpenAI, Anthropic, Google, xAI, Mistral, Perplexity)',
          'Knowledge base creation',
          'Table creation',
          'Document creation',
          'API access',
          'Custom functions',
          'Scheduled workflows',
          'Event triggers',
        ],
        screenshot: [
          {
            '@type': 'ImageObject',
            url: 'https://nocobuilder.cloud/logo/426-240/primary/small.png',
            caption: 'Sim — build AI agents and run your agentic workforce',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://nocobuilder.cloud/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is Sim?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sim is the open-source platform to build AI agents and run your agentic workforce. Teams connect 1,000+ integrations and LLMs to deploy and orchestrate agentic workflows. Create agents, workflows, knowledge bases, tables, and docs. Trusted by over 100,000 builders. SOC2 and HIPAA compliant.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which AI models does Sim support?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sim supports all major AI models including OpenAI (GPT-5, GPT-4o), Anthropic (Claude), Google (Gemini), xAI (Grok), Mistral, Perplexity, and many more. You can also connect to open-source models via Ollama.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do I need coding skills to use Sim?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No coding skills are required. Sim provides a visual interface for building AI agents and agentic workflows. Developers can also use custom functions, the API, and the CLI/SDK for advanced use cases.',
            },
          },
        ],
      },
    ],
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
