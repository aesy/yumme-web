import { Container } from 'inversify';
import { YUMME_CLIENT_TYPE } from '@/api/yumme-client';
import { FakeYummeClient } from '@/api/fake-yumme-client';
import { AxiosYummeClient } from '@/api/axios-yumme-client';
import { AXIOS_CLIENT_TYPE, createAxiosClient } from '@/api/axios-client';

const url = process.env.YUMME_SERVER;

export const container = new Container({
    autoBindInjectable: true,
    defaultScope: 'Singleton',
});

if (url === undefined) {
    console.log('No server url provided, using mock api client');
    container.bind(YUMME_CLIENT_TYPE).to(FakeYummeClient);
} else {
    container.bind(AXIOS_CLIENT_TYPE).toFactory(() => createAxiosClient(url));
    container.bind(YUMME_CLIENT_TYPE).to(AxiosYummeClient);
}
