import { Link } from 'react-router-dom';
import React, { Component, ReactNode } from 'react';
import { observer } from 'mobx-react';
import { resolve } from 'inversify-react';
import NotificationsSharpIcon from '@material-ui/icons/NotificationsSharp';
import ExpandMoreSharpIcon from '@material-ui/icons/ExpandMoreSharp';
import ChatBubbleSharpIcon from '@material-ui/icons/ChatBubbleSharp';
import { Bind } from '@decorize/bind';
import DefaultProfileImage from '@/images/DefaultProfileImage.png';
import { StandardLinkBtn } from '@/common/standard-link-btn';
import styles from '@/common/header.scss';
import { User, YummeClient, YUMME_CLIENT_TYPE } from '@/api/yumme-client';

interface HeaderState {
    currentUser?: User;
}

@observer
export class Header extends Component<unknown, HeaderState> {
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
            <header className={ styles.header }>
                <div className={ styles.content }>
                    <div className={ styles.left }>
                        <span>Logo</span>
                        <nav>
                            <ul>
                                <li>
                                    Browse
                                    { ' ' }
                                    <ExpandMoreSharpIcon />
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className={ styles.right }>
                        <StandardLinkBtn path="/recipe/new">+ ADD RECIPE</StandardLinkBtn>
                        <ChatBubbleSharpIcon />
                        <NotificationsSharpIcon />
                        <Link to={ `/profile/${ this.state.currentUser?.id ?? 1 }` }>
                            <img
                                className={ styles.profile }
                                src={ DefaultProfileImage } />
                        </Link>
                    </div>
                </div>
            </header>
        );
    }

    @Bind
    private async onRefresh(): Promise<void> {
        const currentUser = await this.yummeClient.getCurrentUser();

        this.setState({ currentUser });
    }
}
