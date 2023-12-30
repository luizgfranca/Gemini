# Dockerfile examples for containerized systemd (mainly for test environments)

* `Dockerfile.archlinux`: Arch Linux (systemd 247, as of Feb 2021)
* `Dockerfile.centos-8.3`: CentOS 8.3 (systemd 239)
* `Dockerfile.debian-10`: Debian GNU/Linux 10 (systemd 241)
* `Dockerfile.fedora-33`: Fedora 33 (systemd 246)
* `Dockerfile.opensuse-tumbleweed`: openSUSE Tumbleweed (systemd 246, as of Feb 2021)
* `Dockerfile.ubuntu-20.04`: Ubuntu 20.04 (systemd 245)

## Example

* The command (`/bin/bash`) specified as the argument of `docker run` is executed as the foreground job in the container.
* Workdir (`--workdir /usr`) is propagated
* Env vars (`-e FOO=hello`) are propagated
* The container shuts down when the command exits. The exit status code (`42`) is propagated.

```console
$ docker build -t foo -f Dockerfile.debian-10 .
$ docker run -it --rm --privileged --workdir /usr -e FOO=hello foo /bin/bash
```

## Demo 2: `journalctl -f`

```console
host$ docker run -it --rm --privileged foo journalctl -f
Created symlink /etc/systemd/system/docker-entrypoint.target.wants/docker-entrypoint.service → /etc/systemd/system/docker-entrypoint.service.
Created symlink /etc/systemd/system/systemd-firstboot.service → /dev/null.
Created symlink /etc/systemd/system/systemd-udevd.service → /dev/null.
/docker-entrypoint.sh: starting /lib/systemd/systemd --show-status=false --unit=docker-entrypoint.target
systemd 241 running in system mode. (+PAM +AUDIT +SELINUX +IMA +APPARMOR +SMACK +SYSVINIT +UTMP +LIBCRYPTSETUP +GCRYPT +GNUTLS +ACL +XZ +LZ4 +SECCOMP +BLKID +ELFUTILS +KMOD -IDN2 +IDN -PCRE2 default-hierarchy=hybrid)
Detected virtualization docker.
Detected architecture x86-64.
Set hostname to <827af95def7e>.
+ journalctl -f
-- Logs begin at Wed 2020-02-12 06:20:22 UTC. --
Feb 12 06:20:22 827af95def7e systemd[1]: Started Flush Journal to Persistent Storage.
Feb 12 06:20:22 827af95def7e systemd[1]: Starting Create Volatile Files and Directories...
Feb 12 06:20:22 827af95def7e systemd[1]: Started Create Volatile Files and Directories.
Feb 12 06:20:22 827af95def7e systemd[1]: Condition check resulted in Network Time Synchronization being skipped.
Feb 12 06:20:22 827af95def7e systemd[1]: Reached target System Time Synchronized.
Feb 12 06:20:22 827af95def7e systemd[1]: Starting Update UTMP about System Boot/Shutdown...
Feb 12 06:20:22 827af95def7e systemd[1]: Started Update UTMP about System Boot/Shutdown.
Feb 12 06:20:22 827af95def7e systemd[1]: Reached target System Initialization.
Feb 12 06:20:22 827af95def7e systemd[1]: Started docker-entrypoint.service (journalctl -f).
Feb 12 06:20:22 827af95def7e systemd[1]: Startup finished in 410ms.
^Cgot signal INT
host$ echo $?
130
```

## Bugs
* `docker run` needs `-t`
