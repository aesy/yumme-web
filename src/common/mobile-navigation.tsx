import { Link } from 'react-router-dom';
import React, { Component, ReactNode } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsSharpIcon from '@material-ui/icons/NotificationsSharp';
import ChatBubbleSharpIcon from '@material-ui/icons/ChatBubbleSharp';
import AddIcon from '@material-ui/icons/Add';
import DefaultProfileImage from '@/images/DefaultProfileImage.png';
import styles from '@/common/mobile-navigation.scss';
import { User } from '@/api/yumme-client';

interface MobileNavigationState {
    currentUser?: User;
}

export class MobileNavigation extends Component<unknown, MobileNavigationState> {
    public constructor(props: unknown) {
        super(props);

        this.state = {};
    }

    public render(): ReactNode {
        return (
            <div className={ styles.mobileNavigation }>
                <div className={ styles.left }>
                    <SearchIcon />
                    <ChatBubbleSharpIcon />
                </div>

                <div className={ styles.center }>
                    <Link to="/recipe/new" className={ styles.add } type="button">
                        <AddIcon />
                    </Link>
                </div>

                <div className={ styles.right }>
                    <NotificationsSharpIcon />
                    <Link to={ `/profile/${ this.state.currentUser?.id ?? 1 }` }>
                        <img
                            className={ styles.profile }
                            src={ DefaultProfileImage } />
                    </Link>
                </div>
            </div>
        );
    }
}
