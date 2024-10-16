import { create } from "zustand"

export const useSectionApi = create((set) => ({
    sections: [],
    setSections: (sections) => set({ sections }),
    fetchSections: async () => {
        try {
            const res = await fetch('/api/sections');
            if (!res.ok) {
                throw new Error(`Error: ${res.status} - ${res.statusText}`);
            }

            const data = await res.json();

            if (data && data.success) {
                set({ sections: data.data });
            } else {
                console.error("No products found or API error:", data.message);
            }
        } catch (error) {
            console.error("Error fetching products:", error.message);
        }
    },
    createSection: async (newSection) => {
        if(!newSection.name) {
            return {success: false, message:"Please enter a name"}
        }

        const res = await fetch('/api/sections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSection),
        });
        const data = await res.json();
        set((state) => ({sections: [state.sections, data.data]}))
        return {success: true, message: 'Section created successfully'}
    },
}));