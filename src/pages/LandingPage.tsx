import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { CommonLayoutPage } from './CommonLayoutPage';

interface IQuote {
    quote?: string;
    author?: string;
}

export function LandingPage() {
    const [quote, setQuote] = useState<IQuote>({
        quote: '',
        author: '',
    });

    useEffect(() => {
        api.get('/quotes').then(({ data }) => setQuote(data));
    }, ['quote'])

    return (
        <CommonLayoutPage>
            <h2>{quote.quote}</h2>
            <h4>{quote.author}</h4>
        </CommonLayoutPage>
    );
}
