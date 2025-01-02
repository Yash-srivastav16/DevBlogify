export const validateForm = (formData: { title: string, content: string, tags: string }) => {
    const newErrors = {
      title: "",
      content: "",
      tags: "",
    };
  
    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    } else if (formData.title.trim().length < 5 || formData.title.trim().length > 100) {
      newErrors.title = "Title must be between 5 and 100 characters.";
    }
  
    if (!formData.content.trim()) {
      newErrors.content = "Content is required.";
    } else if (formData.content.trim().length < 20) {
      newErrors.content = "Content must be at least 20 characters.";
    }
  
    if (!formData.tags.trim()) {
      newErrors.tags = "Tags are required.";
    } else if (!/^[a-zA-Z0-9, ]+$/.test(formData.tags)) {
      newErrors.tags = "Tags must be alphanumeric and separated by commas.";
    } else if (formData.tags.trim().split(",").length > 5) {
      newErrors.tags = "You can only add up to 5 tags.";
    }
  
    return newErrors;
  };
  