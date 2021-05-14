import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { FC } from 'react';
import { Recipe } from '@/recipe/recipe';
import { EmptyRecipe } from '@/recipe/empty-recipe';
import { Profile } from '@/profile/profile';
import { Layout } from '@/layout/layout';
import { NotFound } from '@/common/not-found';
import { AuthController } from '@/authentication/auth-controller';

export const App: FC = () => (
    <AuthController>
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path="/profile/:id" component={ Profile } />
                    <Route exact path="/recipe/new" component={ EmptyRecipe } />
                    <Route path="/recipe/:id" component={ Recipe } />
                    <Route component={ NotFound } />
                </Switch>
            </Layout>
        </BrowserRouter>
    </AuthController>
);
