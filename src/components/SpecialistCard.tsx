import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
  linkText: string;
  imageUrl: string;
}

export function SpecialistCard({ title, description, linkText, imageUrl }: CardProps) {
  return (
    <div className="relative w-[320px] md:w-[350px] rounded-[32px] overflow-hidden group cursor-pointer transition-transform duration-300 hover:-translate-y-2">
      {/* Borda sombreada */}
      <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-[#1a1a2e] to-[#16213e] p-[2px]">
        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-[#E2EAF4] to-[#F3F7FA]" />
      </div>
      
      {/* Card interno com fundo e sombra */}
      <div className="relative rounded-[30px] bg-gradient-to-b from-[#E2EAF4] to-[#F3F7FA] shadow-[0_30px_60px_-15px_rgba(30,60,200,0.15)]">
        {/* Imagem com fadeout */}
        <div className="relative h-[300px] w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="350px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#E2EAF4] pointer-events-none" />
        </div>
        
        <div className="p-6 relative">
          <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
          <p className="text-xs text-slate-500 leading-relaxed mb-3">{description}</p>
          <span className="font-bold text-slate-800 text-sm">{linkText} →</span>
        </div>
      </div>
    </div>
  );
}