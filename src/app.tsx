import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { FC } from 'react';
import { Profile } from '@/profile/profile';
import { MobileNavigation } from '@/common/mobile-navigation';
import { Header } from '@/common/header';
import styles from '@/common/global.scss';
import { Footer } from '@/common/footer';

export const App: FC = () => (
    <div className={ styles.page }>
        <Header />

        <BrowserRouter>
            <Switch>
                <Route exact path="/profile" component={ Profile } />
            </Switch>
        </BrowserRouter>

        <MobileNavigation />

        <Footer />
    </div>
);
