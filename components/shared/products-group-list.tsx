'use client';
import {useIntersection} from 'react-use';
import React, {useEffect, useRef} from 'react';
import {Title} from './title';
import {useCategoryStore} from '@/store/category';
import {ProductCard} from './product-card';
import {cn} from '@/lib/utils';
import {ProductWithRelations} from '@/@types/prisma';


interface Props {
	title: string;
	items: ProductWithRelations[];
	categoryId: number;
	listClassName?: string;
	className?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
	                                                   className,
	                                                   title,
	                                                   items,
	                                                   categoryId,
	                                                   listClassName,
                                                   }) => {
	const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

	const intersectionRef = useRef<HTMLDivElement>(null);

	const intersection = useIntersection(
		intersectionRef as React.RefObject<HTMLElement>,
		{
			threshold: 0.4,
		}
	);

	useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveCategoryId(categoryId);
		}
	}, [categoryId, intersection?.isIntersecting, title]);

	return (
		<div
			className={className}
			id={title}
			ref={intersectionRef}
		>
			<Title
				text={title}
				size="lg"
				className="font-extrabold mb-5"
			/>

			<div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-[50px]', listClassName)}>
				{items.map((product) => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						price={product.items[0]?.price ?? 0}
						count={1}
						ingredients={product.ingredients}
						imageUrl={`/${product.imageUrl}`}
					/>
				))}
			</div>
		</div>
	);
};
