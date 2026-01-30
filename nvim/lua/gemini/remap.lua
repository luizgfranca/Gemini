vim.g.mapleader = " "

-- open oil as explorer
-- vim.keymap.set("n", "<leader>e", "<CMD>Oil<CR>")
vim.keymap.set("n", "<leader>ne", vim.cmd.Ex)
 -- vim.keymap.set("n", "<leader>pv", vim.cmd.Ex)

vim.keymap.set("v", "J", ":m '>+1<CR>gv=gv")
vim.keymap.set("v", "K", ":m '<-2<CR>gv=gv")

-- make nvim always use system clipboard for stuff
-- vim.keymap.set("n", "p", "\"+p")
-- vim.keymap.set("v", "p", "\"+p")
-- vim.keymap.set("n", "y", "\"+y")
-- vim.keymap.set("v", "y", "\"+y")
-- vim.keymap.set("n", "Y", "\"+Y")

vim.opt.clipboard = "unnamedplus"

vim.keymap.set("n", "<leader>lf", function() 
    vim.lsp.buf.format()
end)

vim.keymap.set("n", "<C-k>", "<cmd>cnext<CR>zz")
vim.keymap.set("n", "<C-j>", "<cmd>cprev<CR>zz")
vim.keymap.set("n", "<leader>qn", "<cmd>lnext<CR>zz")
vim.keymap.set("n", "<leader>qp", "<cmd>lprev<CR>zz")

-- this always gets me, so out with it
vim.keymap.set("n", "Q", "<nop>")

-- quick shortcuts for exiting and saving
vim.keymap.set("n", "<C-s>", "<cmd>w<CR>")
vim.keymap.set("n", "<C-x>", "<cmd>wq<CR>")
vim.keymap.set("n", "<leader>qq", "<cmd>q!<CR>")

-- resize window panels
vim.keymap.set("n", "<leader>ll", "10<C-w>><CR>")
vim.keymap.set("n", "<leader>hh", "10<C-w><<CR>")

vim.keymap.set("n", "gi", "gF")

vim.keymap.set('n', '<leader>ff', function()
    local input = vim.fn.input("fall ")
    if input ~= '' then 
        vim.cmd('new | r ! fall "' .. input .. '"')
        -- vim.opt_local.readonly = true
        vim.api.nvim_buf_set_option(0, "modified", false)
        -- vim.api.nvim_buf_set_option(0, 'modifiable', false)
        return
    end
end)




