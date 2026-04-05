import { useState } from 'react';
import { enquiriesService, type EnquiryPayload } from '../services/enquiries';

export function useEnquiryForm() {
	const [submitting, setSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const submit = async (payload: EnquiryPayload) => {
		setSubmitting(true);
		setError(null);
		setSuccess(false);

		try {
			await enquiriesService.submit(payload);
			setSuccess(true);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to submit enquiry');
			throw err;
		} finally {
			setSubmitting(false);
		}
	};

	const reset = () => {
		setSubmitting(false);
		setSuccess(false);
		setError(null);
	};

	return { submit, submitting, success, error, reset };
}
