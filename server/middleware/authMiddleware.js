import { requireAuth } from '@clerk/clerk-sdk-node';

const clerkAuthMiddleware = requireAuth();

export { clerkAuthMiddleware };
