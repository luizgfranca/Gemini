require("setup.plugin.telescope")
require("setup.plugin.treesitter")
require("setup.plugin.harpoon")
require("setup.plugin.undotree")
require("setup.plugin.lsp")
-- require("setup.plugin.oil")
require("setup.plugin.autoclose")

vim.opt.termguicolors = true
-- vim.cmd.colorscheme("melange")
vim.cmd.colorscheme 'gruber-darker'
--
vim.api.nvim_set_hl(0, "Normal", { bg = "none" })
vim.api.nvim_set_hl(0, "Function", { fg = "none" })
vim.api.nvim_set_hl(0, "Constant", { fg = "gray90" })
vim.api.nvim_set_hl(0, "Statement", { fg = "none" })
vim.api.nvim_set_hl(0, "Special", { fg = "gray75" })
vim.api.nvim_set_hl(0, "Label", { fg = "none" })
vim.api.nvim_set_hl(0, "Tag", { fg = "none" })

-- vim.api.nvim_set_hl(0, "Identifier", { fg = "#ff0000" })
vim.api.nvim_set_hl(0, "@property", { fg = "gray90" })
vim.api.nvim_set_hl(0, "Type", { fg = "gray85" })
vim.api.nvim_set_hl(0, "@variable.builtin", { fg = "none" })
vim.api.nvim_set_hl(0, "@constant.builtin", { fg = "none" })
vim.api.nvim_set_hl(0, "@type.builtin", { fg = "gray75" })
vim.api.nvim_set_hl(0, "@text.reference", { fg = "none" })
vim.api.nvim_set_hl(0, "@function.builtin", { fg = "none" })
