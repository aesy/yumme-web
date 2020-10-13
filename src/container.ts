import { Container } from 'inversify';
import { YummeClientImpl } from '@/api/yumme-client-impl';
import { YUMME_CLIENT_TYPE } from '@/api/yumme-client';
import { FakeYummeClient } from '@/api/fake-yumme-client';

const isDev = process.env.NODE_ENV === 'development';

export const container = new Container({
    autoBindInjectable: true,
    defaultScope: 'Singleton',
});

if (isDev) {
    container.bind(YUMME_CLIENT_TYPE).to(FakeYummeClient);
} else {
    container.bind(YUMME_CLIENT_TYPE).to(YummeClientImpl);
}
