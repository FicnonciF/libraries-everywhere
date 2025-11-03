import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { type ArrowControlsProps } from '@/types'

const ArrowControls: React.FC<ArrowControlsProps> = ({ onPrev, onNext, className = '' }) => (
	<div className={`hidden md:flex items-center gap-6 text-white/90 ${className}`}>
		<button
			type="button"
			aria-label="Previous slide"
			className="hover:border-white hover:border hover:rounded-full hover:bg-white hover:text-black transition-all p-0.5 cursor-pointer"
			onClick={onPrev}
		>
			<ChevronLeft size={20} />
		</button>
		<button
			type="button"
			aria-label="Next slide"
			className="hover:border-white hover:border hover:rounded-full hover:bg-white hover:text-black transition-all p-0.5 cursor-pointer"
			onClick={onNext}
		>
			<ChevronRight size={20} />
		</button>
	</div>
);

export default ArrowControls