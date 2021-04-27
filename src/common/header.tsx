import React, { FC } from 'react';
import NotificationsSharpIcon from '@material-ui/icons/NotificationsSharp';
import ExpandMoreSharpIcon from '@material-ui/icons/ExpandMoreSharp';
import ChatBubbleSharpIcon from '@material-ui/icons/ChatBubbleSharp';
import styles from '@/common/header.scss';
import { StandardLinkBtn } from './standard-link-btn';

export const Header: FC = () => (
        <header className={ styles.header }>
            <div className={ styles.content }>
                <div className={ styles.left }>
                    <span>Logo</span>
                    <nav>
                        <ul>
                            <li>
                                Browse
                                {' '}
                                <ExpandMoreSharpIcon />
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className={ styles.right }>
                    <StandardLinkBtn path="/new">+ ADD RECIPE</StandardLinkBtn>
                    <ChatBubbleSharpIcon />
                    <NotificationsSharpIcon />
                    <img className={ styles.profile } src="https://img.koket.se/standard-mega/tommy-myllymakis-saftiga-cheeseburgare.jpg" />
                </div>
            </div>
        </header>
);
