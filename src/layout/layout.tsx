import React, { FC, PropsWithChildren } from 'react';
import { MobileNavigation } from '@/common/mobile-navigation';
import { Header } from '@/common/header';
import { Footer } from '@/common/footer';

export const Layout: FC<PropsWithChildren<unknown>> = props => (
    <>
        <Header />
        { props.children }
        <Footer />
        <MobileNavigation />
    </>
);
