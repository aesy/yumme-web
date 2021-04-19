import React, { FC } from 'react';
import NotificationsSharpIcon from '@material-ui/icons/NotificationsSharp';
import ExpandMoreSharpIcon from '@material-ui/icons/ExpandMoreSharp';
import ChatBubbleSharpIcon from '@material-ui/icons/ChatBubbleSharp';
import styles from '@/common/header.scss';
import { StandardBtn } from './standard-btn';

export const Header: FC = props => (
    <header className={ styles.header }>
        <div className={ styles.content }>
            <div className={ styles.left }>
                <span>Logo</span>
                {/* // bryt ut till egen komponent? */}
                <nav>
                    <ul>
                        <li>
                            Browse
                            {' '}
                            <ExpandMoreSharpIcon />
                            <ul />
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={ styles.right }>
                <StandardBtn>+ ADD RECIPE</StandardBtn>
                <ul>
                    <li>
                        <ChatBubbleSharpIcon />
                        <ul />
                    </li>
                </ul>
                <ul>
                    <li>
                        <NotificationsSharpIcon />
                        <ul />
                    </li>
                </ul>
                <img className={ styles.profile } src="https://img.koket.se/standard-mega/tommy-myllymakis-saftiga-cheeseburgare.jpg" />
            </div>
        </div>
    </header>
);
