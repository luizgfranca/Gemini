# .bashrc
#

source ~/.bash_git

# Source global definitions
if [ -f /etc/bashrc ]; then
  . /etc/bashrc
fi

# User specific environment
if ! [[ "$PATH" =~ "$HOME/.local/bin:$HOME/bin:" ]]; then
  PATH="$HOME/.local/bin:$HOME/bin:$PATH"
fi
export PATH

PS1='\033[01;37m\]$(date "+%y-%m-%d %H:%M:%S") \033[01;97m\][\033[01;32m\]\u@\h\[\033[00m\]]: \[\033[01;34m\]\w\[\033[00m\]\[\033[0;37m\]  $(__git_ps1 "(%s)")\[\033[0m\]\n\$ '

# Uncomment the following line if you don't like systemctl's auto-paging feature:
# export SYSTEMD_PAGER=

# User specific aliases and functions
if [ -d ~/.bashrc.d ]; then
  for rc in ~/.bashrc.d/*; do
    if [ -f "$rc" ]; then
      . "$rc"
    fi
  done
fi

unset rc

#alias ls='ls -la'
alias gt='git status'
alias gs='git stash'
alias gsp='git stash pop'
alias gl='git log'
alias gb='git checkout'
alias gc='git commit'
alias gp='git pull --rebase'
#alias python='python3'
alias sqlite='sqlite3'
alias nv='nvim'
alias gpsoc='git push origin $(__git_ps1 "%s")'
alias gpoc='git pull --rebase origin $(__git_ps1 "%s")'
alias ll='ls -la --color=auto'

export PROMPT_COMMAND='history -a'

if test -f "$HOME/.cargo/env"; then
  . "$HOME/.cargo/env"
fi

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"                   # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # This loads nvm bash_completion

# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/home/luiz/anaconda3/bin/conda' 'shell.bash' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/home/luiz/anaconda3/etc/profile.d/conda.sh" ]; then
        . "/home/luiz/anaconda3/etc/profile.d/conda.sh"
    else
        export PATH="/home/luiz/anaconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<

# SDK Man replaced GVM. Using for Groovy, Gradle, and Maven Version Management
export SDKMAN_DIR="$HOME/.sdkman"
[[ -s "$HOME/.sdkman/bin/sdkman-init.sh" ]] && source "$HOME/.sdkman/bin/sdkman-init.sh"

export GIT_EDITOR=nvim

export BUN_INSTALL="$HOME/.bun"
export VCPKG_ROOT="$HOME/vcpkg"
export PATH=$BUN_INSTALL/bin:$PATH
export PATH=$VCPKG_ROOT:$PATH
export PATH=$PATH:/usr/local/go/bin
export PATH=$PATH:"$HOME/templ"
export PATH=$PATH:"$HOME/.local/kitty.app/bin"
export PATH=$PATH:"$HOME/idea/bin"

export EDITOR='nvim'
