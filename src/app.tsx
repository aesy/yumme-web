import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { FC } from 'react';
import { RecipeList } from '@/recipes/recipe-list';
import { Greeter } from '@/greeting/greeter';

export const App: FC = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/recipe" component={ RecipeList } />
            <Route path="/" component={ Greeter } />
        </Switch>
    </BrowserRouter>
);
