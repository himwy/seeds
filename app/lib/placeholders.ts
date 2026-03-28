// Utility functions for generating placeholder images

export const placeholderServices = {
  // Picsum for realistic placeholder photos
  picsum: (width: number = 400, height: number = 300, id?: number) => 
    `https://picsum.photos/${width}/${height}${id ? `?random=${id}` : ''}`,
  
  // Placeholder.com for solid colors with text
  placeholder: (width: number = 400, height: number = 300, color: string = 'cccccc', text?: string) =>
    `https://via.placeholder.com/${width}x${height}/${color}/${text ? `?text=${encodeURIComponent(text)}` : ''}`,
  
  // Generate local SVG placeholder
  localSvg: (width: number = 400, height: number = 300, color: string = '#e5e7eb', text?: string) => {
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${color}"/>
        ${text ? `
          <text x="50%" y="50%" 
                dominant-baseline="middle" 
                text-anchor="middle" 
                fill="#9ca3af" 
                font-family="Arial, sans-serif" 
                font-size="${Math.min(width, height) * 0.08}">
            ${text}
          </text>
        ` : ''}
      </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }
};

// Common placeholder configurations for your app
export const commonPlaceholders = {
  hero: {
    width: 1920,
    height: 1080,
    color: '#f3f4f6',
    text: 'Hero Image'
  },
  about: {
    width: 800,
    height: 600,
    color: '#e5e7eb',
    text: 'About Us'
  },
  financial: {
    width: 800,
    height: 600,
    color: '#ddd6fe',
    text: 'Financial Planning'
  },
  team: {
    width: 400,
    height: 400,
    color: '#fecaca',
    text: 'Team Member'
  },
  event: {
    width: 600,
    height: 400,
    color: '#fed7aa',
    text: 'Event'
  },
  story: {
    width: 500,
    height: 300,
    color: '#bbf7d0',
    text: 'Story'
  }
};

// Quick function to get a placeholder for specific sections
export const getPlaceholder = (type: keyof typeof commonPlaceholders, service: 'picsum' | 'placeholder' | 'localSvg' = 'localSvg') => {
  const config = commonPlaceholders[type];
  
  switch (service) {
    case 'picsum':
      return placeholderServices.picsum(config.width, config.height);
    case 'placeholder':
      return placeholderServices.placeholder(config.width, config.height, config.color.replace('#', ''), config.text);
    default:
      return placeholderServices.localSvg(config.width, config.height, config.color, config.text);
  }
};