export function recipeImageUrl(recipeSlug: string | null | undefined, name: string, size?: string): string {
    // Freshly added images are held as base64 data URLs until the recipe is
    // saved and refetched; render those directly instead of the API path.
    if (name.startsWith('data:')) {
        return name;
    }

    const query = size ? `?size=${size}` : '';

    return `/api/v1/recipe/${recipeSlug}/image/${name}${query}`;
}
