// Selected products array
let selectedProducts = ['Classic Dress'];
let addedProducts = [1]; // IDs of added products

// DOM Elements
const selectedItemsContainer = document.getElementById('selectedItems');
const tryOnBtn = document.getElementById('tryOnBtn');
const modelImage = document.getElementById('modelImage');
const defaultModel = document.getElementById('defaultModel');
const imageUpload = document.getElementById('imageUpload');

// Initialize with default item
updateSelectedItems();

// Function to trigger file upload
function triggerUpload() {
    imageUpload.click();
}

// Handle image upload
imageUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            modelImage.src = event.target.result;
            modelImage.style.display = 'block';
            defaultModel.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

// Function to add product to try-on
function addProduct(productName, productId) {
    if (!addedProducts.includes(productId)) {
        selectedProducts.push(productName);
        addedProducts.push(productId);
        
        // Update UI
        updateSelectedItems();
        
        // Update button state
        const btn = event.target;
        btn.textContent = 'Added';
        btn.classList.add('added');
        btn.disabled = true;
        
        // Enable try-on button if we have at least one item
        if (selectedProducts.length > 0) {
            tryOnBtn.disabled = false;
        }
    }
}

// Function to remove item from selection
function removeItem(productName) {
    const index = selectedProducts.indexOf(productName);
    if (index > -1) {
        selectedProducts.splice(index, 1);
        
        // Remove from addedProducts array
        const productId = getProductIdByName(productName);
        const idIndex = addedProducts.indexOf(productId);
        if (idIndex > -1) {
            addedProducts.splice(idIndex, 1);
            
            // Reset button state
            const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
            const btn = productCard.querySelector('.btn-add');
            btn.textContent = 'Add';
            btn.classList.remove('added');
            btn.disabled = false;
        }
        
        updateSelectedItems();
        
        // Disable try-on button if no items selected
        if (selectedProducts.length === 0) {
            tryOnBtn.disabled = true;
        }
    }
}

// Helper function to get product ID by name
function getProductIdByName(name) {
    const products = {
        'Classic Dress': 1,
        'Venety Bag': 2,
        'Hat': 3,
        'High hell': 4,
        'Premium Hoodie': 5,
        'Designer Jeans': 6
    };
    return products[name];
}

// Update selected items display
function updateSelectedItems() {
    selectedItemsContainer.innerHTML = '';

    if (selectedProducts.length === 0) {
        selectedItemsContainer.innerHTML = '<p style="color: #9ca3af; text-align: center;">No items selected</p>';
    } else {
        selectedProducts.forEach(product => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'selected-item';
            itemDiv.innerHTML = `
                ${product} <button class="remove" onclick="removeItem('${product}')">×</button>
            `;
            selectedItemsContainer.appendChild(itemDiv);
        });
    }
}

// Function to show product details in modal
function showDetails(productId) {
    const productDetails = {
        1: {
            name: "Classic Dress",
            price: "৳1,200",
            description: "Premium quality dress with elegant design. Made from 100% organic cotton for ultimate comfort and style.",
            features: ["AI Virtual Try-On Supported", "Smart Size Recommendation", "100% Organic Cotton", "7 Days Easy Return"],
            image: "../images/dress.PNG"
        },
        2: {
            name: "Venety Bag",
            price: "৳3,500",
            description: "Modern designer bag with premium materials and elegant finishing.",
            features: ["Premium Leather", "Multiple Compartments", "Adjustable Strap", "30 Days Warranty"],
            image: "../images/bag.PNG"
        },
        3: {
            name: "Hat",
            price: "৳1,200",
            description: "Stylish hat perfect for sunny days with UV protection.",
            features: ["UV Protection", "Adjustable Size", "Breathable Material", "Water Resistant"],
            image: "../images/hat.PNG"
        },
        4: {
            name: "High hell",
            price: "৳2,800",
            description: "Elegant high heels for special occasions with comfortable design.",
            features: ["Premium Quality", "Comfort Fit", "Multiple Colors", "Non-slip Sole"],
            image: "../images/shoes.PNG"
        },
        5: {
            name: "Premium Hoodie",
            price: "৳2,800",
            description: "Soft fleece hoodie with temperature regulation technology and moisture-wicking fabric.",
            features: ["Temperature Regulation", "Moisture Wicking", "Kangaroo Pocket", "Premium Zipper"],
            image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7"
        },
        6: {
            name: "Designer Jeans",
            price: "৳2,500",
            description: "Slim fit designer jeans with stretch technology for maximum comfort and modern style.",
            features: ["Stretch Technology", "Slim Fit", "Premium Denim", "Multiple Washes"],
            image: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675"
        }
    };

    const product = productDetails[productId];

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
            <div>
                <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 16px;">
            </div>
            <div>
                <h2 style="font-size: 28px; margin-bottom: 16px; color: #1f2937;">${product.name}</h2>
                <div style="font-size: 24px; font-weight: 800; color: #2563eb; margin-bottom: 20px;">${product.price}</div>
                <p style="color: #4b5563; line-height: 1.7; margin-bottom: 30px;">${product.description}</p>
                <h3 style="font-size: 20px; margin-bottom: 16px; color: #1f2937;">Features</h3>
                <ul style="list-style: none;">
                    ${product.features.map(feature => `<li style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; display: flex; align-items: center; gap: 12px;"><span style="color: #10b981; font-weight: bold;">✓</span> ${feature}</li>`).join('')}
                </ul>
                <button class="btn-add" onclick="addProduct('${product.name}', ${productId}); closeModal();" style="margin-top: 30px; width: 100%; padding: 16px;">
                    Add to Try-On
                </button>
            </div>
        </div>
    `;

    document.getElementById('detailsModal').style.display = 'flex';
}

// Function to close modal
function closeModal() {
    document.getElementById('detailsModal').style.display = 'none';
}

// Function to start AI try-on process
function startTryOn() {
    if (selectedProducts.length === 0) {
        alert('Please add at least one item to try on!');
        return;
    }

    // Show loading overlay
    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingContent = document.querySelector('.loading-content');
    loadingOverlay.style.display = 'flex';

    // Reset everything
    document.getElementById('step1Progress').style.width = '0%';
    document.getElementById('step2Progress').style.width = '0%';
    document.getElementById('step1Percent').textContent = '0%';
    document.getElementById('step2Percent').textContent = '0%';
    document.getElementById('finalImageContainer').style.display = 'none';
    document.getElementById('closeBtn').style.display = 'none';
    document.getElementById('saveBtn').style.display = 'none';

    // Step 1: Image Processing (0-100%)
    let step1Progress = 0;
    const step1Interval = setInterval(() => {
        step1Progress += 1;
        if (step1Progress > 100) step1Progress = 100;
        
        document.getElementById('step1Progress').style.width = step1Progress + '%';
        document.getElementById('step1Percent').textContent = step1Progress + '%';
        
        if (step1Progress === 100) {
            clearInterval(step1Interval);
            
            // Step 2: Generating AI Image (0-100%)
            let step2Progress = 0;
            const step2Interval = setInterval(() => {
                step2Progress += 0.5;
                if (step2Progress > 100) step2Progress = 100;
                
                document.getElementById('step2Progress').style.width = step2Progress + '%';
                document.getElementById('step2Percent').textContent = step2Progress + '%';
                
                if (step2Progress === 100) {
                    clearInterval(step2Interval);
                    
                    // Wait a moment then hide progress bars and show final result
                    setTimeout(() => {
                        // Hide progress bars and step titles
                        const loadingSteps = document.querySelector('.loading-steps');
                        loadingSteps.style.display = 'none';
                        
                        // Show final image container
                        const finalImageContainer = document.getElementById('finalImageContainer');
                        const finalImage = document.getElementById('finalImage');
                        const revealLoading = document.getElementById('revealLoading');
                        const closeBtn = document.getElementById('closeBtn');
                        const saveBtn = document.getElementById('saveBtn');
                        
                        // Use different images based on selected products
                        let resultImage = '../images/output.jpeg';
                        
                        if (selectedProducts.includes('Classic Dress')) {
                            resultImage = '../images/output.jpeg';
                        } else if (selectedProducts.includes('Venety Bag')) {
                            resultImage = '../images/bag.PNG';
                        } else if (selectedProducts.includes('Hat')) {
                            resultImage = '../images/hat.PNG';
                        } else if (selectedProducts.includes('High hell')) {
                            resultImage = '../images/shoes.PNG';
                        }
                        
                        // Update the loading title
                        const loadingTitle = document.querySelector('.loading-content h2');
                        loadingTitle.textContent = 'Your AI Try-On Result';
                        
                        // Show final image
                        finalImage.src = resultImage;
                        finalImageContainer.style.display = 'block';
                        
                        // Start reveal animation
                        revealLoading.style.display = 'block';
                        
                        // Show buttons after reveal animation
                        setTimeout(() => {
                            closeBtn.style.display = 'inline-block';
                            saveBtn.style.display = 'inline-block';
                            revealLoading.style.display = 'none';
                        }, 2000);
                    }, 500);
                }
            }, 50);
        }
    }, 40);
}

// Function to close loading overlay and reset everything
function closeLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingSteps = document.querySelector('.loading-steps');
    const loadingTitle = document.querySelector('.loading-content h2');
    const closeBtn = document.getElementById('closeBtn');
    const saveBtn = document.getElementById('saveBtn');
    const finalImageContainer = document.getElementById('finalImageContainer');
    
    // Reset everything
    loadingSteps.style.display = 'block';
    loadingTitle.textContent = 'Generating Your AI Try-On';
    closeBtn.style.display = 'none';
    saveBtn.style.display = 'none';
    finalImageContainer.style.display = 'none';
    
    // Hide overlay
    loadingOverlay.style.display = 'none';
}

// Function to save the generated image
function saveImage() {
    const link = document.createElement('a');
    link.href = document.getElementById('finalImage').src;
    link.download = 'stylomind-try-on.jpg';
    link.click();
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('detailsModal');
    if (event.target === modal) {
        closeModal();
    }
});