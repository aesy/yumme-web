import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { FC } from 'react';
import { Profile } from '@/profile/profile';
import { Header } from '@/common/header';
import { Footer } from '@/common/footer';
import styles from '@/common/default.scss';
import { MobileNavigation } from './common/mobile-navigation';

export const App: FC = () => (
    <div className={ styles.page }>
        <Header />

        <BrowserRouter>
            <Switch>
                <Route exact path="/profile" component={ Profile } />
                {/* <Route path="/" component={ Greeter } /> */}
            </Switch>
        </BrowserRouter>

        <MobileNavigation />

        <Footer />
    </div>

);
