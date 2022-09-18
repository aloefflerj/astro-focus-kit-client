import { useState } from 'react';
import { Card } from '../../components/Card/Card';

interface Props {
  title: string;
}

export function Option({ title }: Props) {
  return <Card color='optionColor'>{title}</Card>;
}
