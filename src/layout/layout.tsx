import React, { FC } from 'react';
import { MobileNavigation } from '@/common/mobile-navigation';
import { Header } from '@/common/header';
import { Footer } from '@/common/footer';

export const Layout: FC<unknown> = props => (
    <>
        <Header />
        { props.children }
        <Footer />
        <MobileNavigation />
    </>
);
