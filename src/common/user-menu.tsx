import { Link } from 'react-router-dom';
import React, { Component, ReactNode } from 'react';
import { resolve } from 'inversify-react';
import NotificationsSharpIcon from '@material-ui/icons/NotificationsSharp';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import ChatBubbleSharpIcon from '@material-ui/icons/ChatBubbleSharp';
import { bind } from '@decorize/bind';
import DefaultProfileImage from '@/images/DefaultProfileImage.png';
import styles from '@/common/user-menu.scss';
import { AuthState } from '@/authentication/auth-state';
import { type User, type YummeClient, YUMME_CLIENT_TYPE } from '@/api/yumme-client';
import { StandardLinkBtn } from './standard-link-btn';

interface UserMenuState {
    currentUser?: User;
}

export class UserMenu extends Component<unknown, UserMenuState> {
    @resolve(AuthState)
    private readonly authState: AuthState;

    @resolve(YUMME_CLIENT_TYPE)
    private readonly yummeClient: YummeClient;

    public constructor(props: unknown) {
        super(props);

        this.state = {};
    }

    public componentDidMount(): void {
        this.onRefresh();
    }

    public render(): ReactNode {
        return (
            <ul className={ styles.userMenu }>
                <li className={ styles.navigationItem }>
                    <StandardLinkBtn path="/recipe/new">+ ADD RECIPE</StandardLinkBtn>
                </li>
                <li className={ styles.navigationItem }>
                    <ChatBubbleSharpIcon className={ styles.icon } />
                </li>
                <li className={ styles.navigationItem }>
                    <NotificationsSharpIcon className={ styles.icon } />
                </li>
                <li className={ styles.navigationItem }>
                    <Link to={ `/profile/${ this.state.currentUser?.id ?? 1 }` }>
                        <img
                        className={ styles.profileImage }
                        src={ DefaultProfileImage } />
                    </Link>

                    <ul className={ styles.dropdown }>
                        <li className={ styles.menuItem }>
                            <Link to={ `/profile/${ this.state.currentUser?.id ?? 1 }` }>
                                <span>Go to my profile</span>
                            </Link>
                        </li>

                        <li className={ styles.menuItem } onClick={ (): void => this.authState.logout() }>
                            <Link to="">
                                <span>Log out</span>
                                <ExitToAppSharpIcon />
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        );
    }

    @bind
    private async onRefresh(): Promise<void> {
        const currentUser = await this.yummeClient.getCurrentUser();

        this.setState({ currentUser });
    }
}
