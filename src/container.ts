import { Container } from 'inversify';
import { HttpYummeClient } from '@/api/yumme-client-impl';
import { YUMME_CLIENT_TYPE } from '@/api/yumme-client';
import { FakeYummeClient } from '@/api/fake-yumme-client';
import { API_CLIENT_TYPE, createApiClient } from '@/api/api-client';

const mock = import.meta.env.VITE_MOCK_SERVER;

export const container = new Container({
    autoBindInjectable: true,
    defaultScope: 'Singleton',
});

if (mock === 'true') {
    console.log('Using mock api client');
    container.bind(YUMME_CLIENT_TYPE).to(FakeYummeClient);
} else {
    container.bind(API_CLIENT_TYPE).toDynamicValue(createApiClient);
    container.bind(YUMME_CLIENT_TYPE).to(HttpYummeClient);
}
