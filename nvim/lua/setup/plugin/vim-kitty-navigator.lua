vim.g.kitty_navigator_no_mappings = 1
vim.keymap.set("n", "<M-l>", function() vim.cmd("KittyNavigateRight")  end)
vim.keymap.set("n", "<M-h>", function() vim.cmd("KittyNavigateLeft")  end)
vim.keymap.set("n", "<M-j>", function() vim.cmd("KittyNavigateDown")  end)
vim.keymap.set("n", "<M-k>", function() vim.cmd("KittyNavigateUp")  end)
