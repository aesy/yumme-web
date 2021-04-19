import React, { FC } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsSharpIcon from '@material-ui/icons/NotificationsSharp';
import ChatBubbleSharpIcon from '@material-ui/icons/ChatBubbleSharp';
import AddIcon from '@material-ui/icons/Add';
import styles from '@/common/mobile-navigation.scss';
import { RoundBtn } from './round-btn';
import { Bordered } from './bordered';

export const MobileNavigation: FC = props => (
    <div className={ styles.mobileNavigation }>
        <div className={ styles.left }>
            <SearchIcon />
            <ChatBubbleSharpIcon />
        </div>

        <div className={ styles.center }>
            <Bordered round size="medium"><RoundBtn><AddIcon /></RoundBtn></Bordered>
        </div>

        <div className={ styles.right }>
            <NotificationsSharpIcon />
            <img className={ styles.profile } src="https://img.koket.se/standard-mega/tommy-myllymakis-saftiga-cheeseburgare.jpg" />
        </div>
    </div>
);