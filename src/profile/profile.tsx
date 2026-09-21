import { useParams } from 'react-router-dom';
import React, { type ReactNode, useEffect, useState } from 'react';
import { useInjection } from 'inversify-react';
import { Summary } from '@/profile/summary';
import { Recipes } from '@/profile/recipes';
import styles from '@/profile/profile.module.scss';
import { Hero } from '@/profile/hero';
import { Collections } from '@/profile/collections';
import { ViewNavigation } from '@/common/view-navigation';
import { type User, YUMME_CLIENT_TYPE, type YummeClient } from '@/api/yumme-client';

type View = 'Summary' | 'Recipes' | 'Collections';

export function Profile(): ReactNode {
    const yummeClient = useInjection<YummeClient>(YUMME_CLIENT_TYPE);
    const { slug } = useParams();

    const [user, setUser] = useState<User | null>(null);
    const [view, setView] = useState<View>('Summary');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const refresh = async (): Promise<void> => {
            const fetchedUser = await yummeClient.getUserBySlug(slug ?? '');

            setUser(fetchedUser);
        };

        setUser(null);
        void refresh();
    }, [slug, yummeClient]);

    const handler = (newView: string): void => {
        setView(newView as View);
    };

    return (
        <div className={styles.profile}>
            {user && <Hero user={user} />}

            <ViewNavigation active={view} navigations={['Summary', 'Recipes', 'Collections']} handler={handler} />

            {view === 'Summary' && user && <Summary user={user} />}

            {view === 'Recipes' && <Recipes />}

            {view === 'Collections' && <Collections />}
        </div>
    );
}
