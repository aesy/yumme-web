import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { FC } from 'react';
import { Recipe } from '@/recipe/recipe';
import { Profile } from '@/profile/profile';
import { MobileNavigation } from '@/common/mobile-navigation';
import { Header } from '@/common/header';
import { Footer } from '@/common/footer';
import { AuthController } from '@/authentication/auth-controller';
import styles from '@/app.scss';
import { NotFound } from './common/not-found';

export const App: FC = () => (
    <div className={ styles.page }>
        <AuthController>
            <Header />
            <BrowserRouter>
                <Switch>
                    <Route path="/profile/:id" component={ Profile } />
                    <Route path="/recipe/:id" component={ Recipe } />
                    <Route component={ NotFound } />
                </Switch>
            </BrowserRouter>
            <MobileNavigation />
            <Footer />
        </AuthController>
    </div>
);
