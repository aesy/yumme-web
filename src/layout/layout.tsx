import React, { PureComponent, ReactNode } from 'react';
import { MobileNavigation } from '@/common/mobile-navigation';
import { Header } from '@/common/header';
import { Footer } from '@/common/footer';


export class Layout extends PureComponent<unknown> {
    public constructor(props: unknown) {
        super(props);
    }

    public render(): ReactNode {
        return (
            <>
                <Header />
                {this.props.children}
                <Footer />
                <MobileNavigation />
            </>
        );
    }
}
