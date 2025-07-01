
import {create} from "zustand" ; 

export const useProductStore = create(set => ({
    
    products: [],
    setProducts:(products)=>set({products}),

    createProduct: async(newProduct)=>{
        if(!newProduct.name || !newProduct.image || !newProduct.price){
            return {success:false , message:"please fill all fields"};
        }
        

        try {
            const res = await fetch("/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
            });

            // במידה והסטטוס לא תקין (500, 404, 400 וכו')
            if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Server Error: ${res.status} - ${errorText}`);
            }

            const data = await res.json();
            set((state) => ({
            products: [...state.products, data.data],
            }));

            return { success: true, message: "Product created successfully" };
        } 
        catch (error) {
            console.error("Create product error:", error.message);
            return { success: false, message: "Something went wrong while creating the product" };
        }


    },

    fetchProducts: async ()=>{
        const res =await fetch('/products');
        const data = await res.json();
        set({products: data.data});
    },

    deleteproduct: async (pid)=>{
        const res= await fetch(`/products/delete/${pid}`,{
            method: 'DELETE',
        });
        const data = await res.json();
        if(!data.success) return {success:false,message:data.message};
        set((state)=>({products: state.products.filter((product)=>product._id !== pid)}))
        return {success:true , message:data.message};
    },

    updateproduct: async (pid,updateproduct)=>{
        console.log(pid)
        const res= await fetch(`/products/${pid}`,{
            method:'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateproduct),
    });
    const data= await res.json();
    if(!data.success) return {success:false,message:data.message};
    set((state)=>({products: state.products.map((product)=>product._id === pid ? data.data :product)}))
        return {success:true , message:data.message};
    },
}));