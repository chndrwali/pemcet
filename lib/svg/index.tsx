interface ClassNameProps {
  className?: string;
}

export const Background1 = ({ className }: ClassNameProps) => {
  return (
    <svg
      className={className} // Pastikan SVG mengikuti ukuran parent-nya
      viewBox="0 0 1122 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice" // Buat proporsi sesuai kebutuhan
    >
      <mask id="mask0_67_17" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="1122" height="410">
        <path d="M0 0H1121.85V409.156H0V0Z" fill="white" />
      </mask>
      <g mask="url(#mask0_67_17)">
        <path d="M0 -307.083H1124.71V409.156H0V-307.083Z" fill="#FF5733" />
      </g>
    </svg>
  );
};

export const Background2 = ({ className }: ClassNameProps) => {
  return (
    <svg className={className} width="1300" height="400" viewBox="0 0 1300 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Mask Definitions */}
      <mask id="mask0_67_1040" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="1300" height="400">
        <path d="M0 0H958.068V718.359H0V0Z" fill="white" />
      </mask>
      <g mask="url(#mask0_67_1040)">
        <mask id="mask1_67_1040" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="1300" height="400">
          <path
            d="M559.349 26.5052L928.125 299.693C946.974 313.656 958.089 335.724 958.089 359.182C958.089 382.635 946.974 404.708 928.125 418.672L559.349 691.859C511.646 727.198 446.443 727.198 398.74 691.859L29.9635 418.672C11.1146 404.708 0 382.635 0 359.182C0 335.724 11.1146 313.656 29.9635 299.693L398.74 26.5052C446.443 -8.83329 511.646 -8.83329 559.349 26.5052Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask1_67_1040)">
          <path d="M0 0V718.359H958.068V0H0Z" fill="url(#paint0_linear_67_1040)" />
        </g>
      </g>

      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="paint0_linear_67_1040" x1="479.024" y1="0.00113137" x2="479.024" y2="718.361" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF5733" />
          <stop offset="0.5" stopColor="#FF5733" />
          <stop offset="0.503906" stopColor="#FF5834" />
          <stop offset="0.507813" stopColor="#FF5935" />
          <stop offset="0.511400" stopColor="#FF5A35" />
          <stop offset="0.515625" stopColor="#FF5A36" />
          <stop offset="0.519531" stopColor="#FF5B37" />
          <stop offset="0.523438" stopColor="#FF5C38" />
          <stop offset="0.527344" stopColor="#FF5D39" />
          <stop offset="0.53125" stopColor="#FF5E3A" />
          <stop offset="0.535156" stopColor="#FF5F3A" />
          <stop offset="0.539062" stopColor="#FF603B" />
          <stop offset="0.542969" stopColor="#FF603C" />
          <stop offset="0.546875" stopColor="#FF613D" />
          <stop offset="0.550781" stopColor="#FF623E" />
          <stop offset="0.554688" stopColor="#FF633F" />
          <stop offset="0.558594" stopColor="#FF643F" />
          <stop offset="0.5625" stopColor="#FF6540" />
          <stop offset="0.566406" stopColor="#FF6641" />
          <stop offset="0.570312" stopColor="#FF6742" />
          <stop offset="0.574219" stopColor="#FF6743" />
          <stop offset="0.578125" stopColor="#FF6844" />
          <stop offset="0.582031" stopColor="#FF6944" />
          <stop offset="0.585938" stopColor="#FF6A45" />
          <stop offset="0.589844" stopColor="#FF6B46" />
          <stop offset="0.59375" stopColor="#FF6C47" />
          <stop offset="0.597656" stopColor="#FF6D48" />
          <stop offset="0.601563" stopColor="#FF6D49" />
          <stop offset="0.605469" stopColor="#FF6E49" />
          <stop offset="0.609375" stopColor="#FF6F4A" />
          <stop offset="0.613281" stopColor="#FF704B" />
          <stop offset="0.617188" stopColor="#FF714C" />
          <stop offset="0.621094" stopColor="#FF724D" />
          <stop offset="0.625" stopColor="#FF734E" />
          <stop offset="0.628906" stopColor="#FF744E" />
          <stop offset="0.632812" stopColor="#FF744F" />
          <stop offset="0.636400" stopColor="#FF7550" />
          <stop offset="0.640625" stopColor="#FF7651" />
          <stop offset="0.644531" stopColor="#FF7752" />
          <stop offset="0.648438" stopColor="#FF7852" />
          <stop offset="0.652344" stopColor="#FF7953" />
          <stop offset="0.65625" stopColor="#FF7A54" />
          <stop offset="0.660156" stopColor="#FF7A55" />
          <stop offset="0.664062" stopColor="#FF7B56" />
          <stop offset="0.667969" stopColor="#FF7C57" />
          <stop offset="0.671875" stopColor="#FF7D57" />
          <stop offset="0.675781" stopColor="#FF7E58" />
          <stop offset="0.679688" stopColor="#FF7F59" />
          <stop offset="0.683594" stopColor="#FF805A" />
          <stop offset="1" stopColor="#FF805A" />
        </linearGradient>
      </defs>
    </svg>
  );
};
