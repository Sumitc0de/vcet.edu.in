import { post } from './api';

export interface EnquiryPayload {
	name: string;
	email: string;
	phone?: string | null;
	message?: string | null;
	course?: string | null;
}

interface EnquirySubmitResponse {
	success?: boolean;
	message?: string;
	data?: Record<string, unknown>;
}

export const enquiriesService = {
	async submit(payload: EnquiryPayload): Promise<EnquirySubmitResponse> {
		return post<EnquirySubmitResponse>('/enquiries', payload);
	},
};
