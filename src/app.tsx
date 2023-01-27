import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
                <Routes>
                    <Route path="/profile/:id" element={ <Profile /> } />
                    <Route path="/recipe/new" element={ <EmptyRecipe /> } />
                    <Route path="/recipe/:id" element={ <Recipe /> } />
                    <Route element={ <NotFound /> } />
                </Routes>
            </Layout>
        </BrowserRouter>
    </AuthController>
);
